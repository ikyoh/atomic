export async function sendMail(subject, body, mutationId = 'contact') {
  const fromAddress = 'noreply@yourwebsite.com';
  const toAddress = 'someone@yourwebsite.com';
  const data = await fetchAPI(
    `
		mutation SendEmail($input: SendEmailInput!) {
			sendEmail(input: $input) {
				message
				origin
				sent
			}
		}
	`,
    {
      variables: {
        input: {
          clientMutationId: mutationId,
          from: fromAddress,
          to: toAddress,
          body: body,
          subject: subject,
        },
      },
    }
  );

  return data?.sendEmail;
}