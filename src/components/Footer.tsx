export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p>© {year} Raysin</p>
        </div>
        <div className="footer-right">
          <p>Built with passion in Darjeeling</p>
        </div>
      </div>
    </footer>
  )
}
