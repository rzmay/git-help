import React from 'react';
import useAJAX from '../hooks/useAJAX';
import useLogin from '../hooks/useLogin';
import Code from '../components/Code2';
import useAccount from '../hooks/useAccount';


export default function QuickStart() {
  useLogin(true);

  const data = useAJAX('/ajax/account/github');

  const { data: account, error, loading } = useAccount();

  if (loading) return <div>Please login before accessing the dashboard</div>;
  if (error) return <div>Error: {error.message}</div>;
  // Ensure that user and accountKey are defined before using them
  const scriptCode =
    `<script src="http://localhost:7000/embed/?key=${account.public_key}&user={USER_ID}"></script>
    <script src="http://localhost:7000/embed/css"></script>`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quick Start Guide</h1>
      <p>Welcome to our Quick Start Guide. Here you'll find essential resources to get you up and running quickly.</p>

      <ul className="list-disc pl-5 mt-4">
        <li>
          <a href={data?.link} className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
            Link to Repo - Install the Github Application
          </a>
        </li>
      </ul>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Embedding Code</h2>
        <Code multiline>
          {scriptCode}
        </Code>
      </div>
    </div>
  );
}
