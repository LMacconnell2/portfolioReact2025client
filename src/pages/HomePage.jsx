import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();

        // Sort descending by projectId and take the top 6
        const topProjects = data
          .sort((a, b) => b.projectId - a.projectId)
          .slice(0, 6);

        setProjects(topProjects);
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

  return (
    <>
      <header>
        <nav className="nav">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <img
            className="home-hero-img"
            src="/images/hero-image.jpg"
            alt="An image of something cool"
          />
        </section>

        <section className="home-projects">
          {projects.map(project => (
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
