import React from 'react';
import useAJAX from '../hooks/useAJAX';
import useLogin from '../hooks/useLogin';
import Code from '../components/Code2'

export default function QuickStart() {
  useLogin(true);

  const data = useAJAX('/ajax/account/github');

  const scriptCode = `<script src="http://localhost:7000/embed/?key=Flying-Abdoul-2QC7A-iavnQ-Cg4Tgqsjr&user=janet"></script>
  <script src="http://localhost:7000/embed/css"></script>`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quick Start Guide</h1>
      <p>Welcome to our Quick Start Guide. Here you'll find essential resources to get you up and running quickly.</p>

      <ul className="list-disc pl-5 mt-4">
        <li>
          <a href={data?.link} className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
            Link to Repo
          </a>
        </li>
        <li>
          <code>git clone https://github.com/your-repo.git</code>
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
