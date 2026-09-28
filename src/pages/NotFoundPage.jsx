import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./NotFoundPage.css";

function NotFoundPage() {
  useEffect(() => {
    document.title = "ARK II | Page Not Found";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "The ARK II page you requested could not be found.");
    const socialTitle = document.querySelector('meta[property="og:title"]');
    const socialDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (socialTitle) socialTitle.setAttribute("content", document.title);
    if (socialDescription) socialDescription.setAttribute("content", "The ARK II page you requested could not be found.");
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);
    if (twitterDescription) twitterDescription.setAttribute("content", "The ARK II page you requested could not be found.");
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute("content", "noindex, follow");
    return () => {
      if (robots) robots.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    };
  }, []);

  return (
    <div className="not-found-page">
      <Navbar />
      <main>
        <p className="not-found-page__kicker">ARK II / 404</p>
        <h1>That page<br /><span>doesn't exist.</span></h1>
        <p>The page you are looking for may have moved, or the address may be incorrect.</p>
        <a href="/"><ArrowLeft size={15} /> Back to ARK II</a>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
