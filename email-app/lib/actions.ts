"use server";
import { Resend } from "resend";
import { WhopAPI } from "@whop-apps/sdk";

const resend = new Resend(process.env.RESEND_API_KEY);

async function retrieveEmail(userId: string) {
  // Retrieve the email of a user
  const response = await WhopAPI.app().GET("/app/users/{id}", {
    params: {
      path: {
        id: userId,
      },
    },
  });

  if (!response.data) {
    return null;
  }

  return response.data.email ? response.data.email : null;
}

export default async function SendEmail(prevState: any, formData: FormData) {
  const companyId = formData.get("companyId") as string; // Parse all the data from the form
  const productId = formData.get("productId") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const memberships = await WhopAPI.app().GET("/app/memberships", {
    // Retrieve all memberships for the product
    params: {
      query: {
        company_id: companyId,
        product_id: productId === "all" ? undefined : productId, // If the product ID is "all", then don't filter by product ID
        valid: true,
        per: 50,
      },
    },
  });

  if (!memberships.data) {
    return { error: true, message: "No memberships found" }; // Return an error if there were no memberships found
  }

  let emailList = [] as string[];

  for (const membership of memberships.data.data) {
    // Loop through all the memberships and fetch the email of the user
    if (membership.user_id) {
      const email = await retrieveEmail(membership.user_id);
      if (email) {
        // If the email exists, add it to the list
        emailList.push(email);
      }
    }
  }

  const data = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>", // TODO: Change this to your own email
    to: emailList,
    subject: title,
    text: body,
  });

  if (data.error) {
    return { error: true, message: data.error.message }; // Return an error if there was an error sending the emails
  }

  return { error: false, message: "Emails sent successfully" }; // Return a success message if the emails were sent successfully
}
