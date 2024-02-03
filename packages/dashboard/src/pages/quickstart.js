import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import useAJAX from '../hooks/useAJAX';
import useAccount from '../hooks/useAccount';
import useLogin from '../hooks/useLogin';

export default function QuickStart() {
  useLogin(true);

  const data = useAJAX('/ajax/account/github');

  const { data: account, error, loading } = useAccount();

  if (loading) return <div>Please login before accessing the dashboard</div>;
  if (error) return <div>Error: {error.message}</div>;
  // Ensure that user and accountKey are defined before using them
<<<<<<< HEAD
  const scriptCode =
    `<link rel="stylesheet" href="https://rawcdn.githack.com/rzmay/git-help/main/packages/embed/styles.css"></link>
<div id="githelp"></div>
<script src="http://localhost:7000/embed/?key=${account.public_key}&user={USER_ID}"></script>
=======
  const scriptCode = `<script src="http://localhost:7000/embed/?key=${account.public_key}&user={USER_ID}"></script>
>>>>>>> 6c4d9962f8cfc36813787c7d134199ab7d54a8ae
<script src="http://localhost:7000/embed/css"></script>`;

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Quick Start Guide</h1>
      <p>Welcome to our Quick Start Guide. Here you'll find essential resources to get you up and running quickly and using GitHelp!.</p>
      <ul className="list-disc pl-5 mt-4">
        <li>
          <h1 className="text-2xl mb-4">Download the GitHub App</h1>
          <p>First in order to use our serivce, you must connect your github repository to our GitHub App. This is required in order for GitHelp to be able to create issues in the repository.</p>
          <a href={data?.link} className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
            Link to Repo - Install the Github Application
          </a>
        </li>
        <li>
          <div className="mt-4">
            <h1 className="text-2xl mb-4">Embed the application onto your website.</h1>
            <p>Add the following code to your website. This will add a small icon to your website which allows users to input their feedback into a text prompt when it is clicked. The key is your own custom key that is used to classify your own company. Do not share this with anyone, keep this private. Fill in the userID with an ID of your choice.</p>
            <div>
              <CopyBlock
                text={scriptCode}
                language="python"
                showLineNumbers="true"
                wrapLines
                theme={dracula}
              />
            </div>
          </div>
        </li>
      </ul>
      <br />
      <p>And it's as simple as that! You've now successfully added the GitHelp application into your website. Now you can wait for your both your database and GitHub to populate with user feedback.</p>
    </div>
  );
}
