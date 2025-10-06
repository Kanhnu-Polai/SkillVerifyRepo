import React, { useEffect, useState } from 'react'
import NewsService from './NewsService';
import NewsSlider from '../../components/home/NewsSlider';

const NewsPage = () => {
   const [articles, setArticles] = useState([]);

  useEffect(() => {
   

    const fetchNews = async () => {
      try {
        const data = await NewsService.getAllNews(); // ✅ this is response.data
      
        setArticles(data); // ✅ directly set articles from data
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
   
  }, [articles]);


  return (
  <div className="bg-linear-to-r from-gray-800 via-blue-700 to-gray-900 rounded-t-xl p-4 overflow-x-hidden overflow-hidden mb-1 pb-8">
    <h2 className="text-2xl font-bold text-slate-50 mb-4 px-4 md:px-0 text-center  ">
   Latest News
</h2>
    {Array.isArray(articles) && articles.length > 0 ? (
      <NewsSlider newsList={articles} />
    ) : (
      <p className="text-center text-gray-500">Loading news articles...</p>
    )}
  </div>
);
};

export default NewsPage;