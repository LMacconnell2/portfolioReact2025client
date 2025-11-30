import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    //feathcProjects grabs the project data using an API call.
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`); //The API call, which uses a custom variable from an env file
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        // sort by newest projects first (just using the projectId)
        setProjects(data.sort((a, b) => b.projectId - a.projectId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  // filter the projects before rendering
  const filteredProjects = projects.filter(project =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <nav className="nav">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
        </nav>
      </header>

      <main class="AllProjects-page">
        <section className="AllProjects-search">
          <form
            id="AllProjects-search-form"
            onSubmit={e => e.preventDefault()} // prevent page reload
          >
            <label id="search-label">Search by name: </label>
            <p><input
              id="search-input"
              type="text"
              name="AllProjects-search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            /></p>
          </form>
        </section>

        <section className="AllProjects-projects">
          {filteredProjects.map(project => (
            <Link
              key={project.projectId}
              className="project-card-link"
              to={`/projects/${project.projectId}`}
            >
              <div className="project-card">
                <h2 className="project-card-title">{project.projectTitle}</h2>
                <p className="project-card-date">
                  Completed: {new Date(project.dateCompleted).toLocaleDateString()}
                </p>
                <p className="project-card-desc">{project.projectDescription}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; Logan MacConnell 2025</p>
      </footer>
    </>
  );
}