export default function QuickStart() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quick Start Guide</h1>
      <p>Welcome to our Quick Start Guide. Here you'll find essential resources to get you up and running quickly.</p>

      <ul className="list-disc pl-5 mt-4">
        <li>
          <a href="https://github.com/your-repo" className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
            Link to Repo
          </a>
        </li>
        <li>
          <code>git clone https://github.com/your-repo.git</code>
        </li>
      </ul>
    </div>
  );
}
