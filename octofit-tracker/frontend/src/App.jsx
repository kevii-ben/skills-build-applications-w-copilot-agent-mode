import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary mb-3">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Modern multi-tier fitness tracking</h1>
          <p className="lead text-muted">
            Track workouts, manage teams, and stay motivated with a React, Express, and MongoDB experience.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
              Vite docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Ready for launch</h2>
              <p className="text-muted mb-0">
                The presentation tier is running on port 5173, and the backend API is prepared for port 8000.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
