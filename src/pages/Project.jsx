import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProjectPage() {
  const { projectId } = useParams(); // Route: /projects/:projectId
  console.log("Project ID:", projectId);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    //Use the API to call our project. The controller will then grab it from the DB
    async function fetchProject() {
      try {
        const test = (`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`);
        console.log(test); //Making sure the url for the API call is correct. (Spoiler, it wasn't, but its fixed now.)
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`); //The api call

        if (!res.ok) throw new Error("Failed to fetch project");

        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <>
      <header>
        <nav className="nav">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
        </nav>
      </header>
    
      <main id="project-page">
        <section className="project-header">
          <h1>{project.projectTitle}</h1>
          <p>
            <strong>Started:</strong>{" "}
            {new Date(project.dateStarted).toLocaleDateString()}
          </p>
          <p>
            <strong>Completed:</strong>{" "}
            {new Date(project.dateCompleted).toLocaleDateString()}
          </p>
        </section>

        <section className="project-description">
          <h2>Description</h2>
          <p>{project.projectDescription}</p>
        </section>

        <section className="project-details">
          <h2>Details</h2>
          <p>{project.projectParagraph}</p>
        </section>

        <section className="project-links">
          <h2>Links</h2>
          <ul>
            <li>
              <a href={project.projectRepoLink} target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </li>
            <li>
              <a href={project.projectVideoLink} target="_blank" rel="noopener noreferrer">
                Project Video / Demo
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; Logan MacConnell 2025</p>
      </footer>
    </>
  );
}