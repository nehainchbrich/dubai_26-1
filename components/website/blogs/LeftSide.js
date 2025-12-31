import { ImagePath, imageKitLoader, formatDate } from '@/helper/Helper'
import Image from 'next/image'
import Link from 'next/link';
import CommentFrm from './CommentFrm';

const LeftSide = ({ data, comment }) => {
  const postDate = formatDate(data.createdAt);
  const description = ImagePath(data.description, data.title);
  return (
    <>
      <div className="blog-container">
        <div className="back-nav mb-4">
          <Link href="/blogs" className="back-link">
            <i className="fas fa-arrow-left me-2"></i> Back to Insights
          </Link>
        </div>

        <div className="main-image-wrapper mb-5">
          <Image
            loader={imageKitLoader}
            src={`${data.thumbnail}`}
            alt={data.title}
            width={1200}
            height={600}
            className="main-thumb"
            priority
          />
          <div className="share-actions">
            <button className="share-btn"><i className="fab fa-whatsapp"></i></button>
            <button className="share-btn"><i className="fab fa-facebook-f"></i></button>
            <button className="share-btn"><i className="fab fa-twitter"></i></button>
            <button className="share-btn"><i className="fas fa-link"></i></button>
          </div>
        </div>

        <article className="content-article">
          <div className="editorial-body" dangerouslySetInnerHTML={{ __html: description }} />
        </article>

        <div className="comment-section mt-5 pt-5 border-top">
          <h3 className="section-title mb-4">Readers Comments</h3>
          <CommentFrm blogCode={data.code} comment={comment} />
        </div>

        <style jsx>{`
        .blog-container {
          padding-right: 20px;
        }

        .back-link {
          color: #d3122a;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .back-link:hover {
          transform: translateX(-5px);
        }

        .main-image-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }

        .main-thumb {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.8s ease;
        }

        .main-image-wrapper:hover .main-thumb {
          transform: scale(1.03);
        }

        .share-actions {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
          z-index: 5;
        }

        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .share-btn:hover {
          background: #d3122a;
          color: #fff;
          transform: translateY(-3px);
        }

        .editorial-body {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #222;
        }

        .editorial-body :global(p) {
          margin-bottom: 30px;
        }

        .editorial-body :global(h2), 
        .editorial-body :global(h3) {
          color: #111;
          font-weight: 700;
          margin: 50px 0 25px;
          line-height: 1.3;
          border-left: 4px solid #d3122a;
          padding-left: 15px;
        }

        .editorial-body :global(img) {
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
          margin: 40px 0;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111;
        }

        @media (max-width: 768px) {
          .blog-container {
             padding-right: 0;
          }
          .share-actions {
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>
      </div>
    </>
  )
}

export default LeftSide
