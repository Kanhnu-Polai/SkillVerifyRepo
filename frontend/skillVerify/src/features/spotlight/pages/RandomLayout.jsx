import React from "react";

export default function CategoryGrid({setActiveTopic,setActiveTab,setCategoryManager}) {
  const categories = [
  { title: "Trending", color: "bg-gradient-to-r from-blue-400 to-blue-600",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFVLln4gMwhH3tKKmmUojPztweVD4CoyyJAg&s" },
  { title: "Technology", color: "bg-gradient-to-r from-green-400 to-green-600",image:"https://t4.ftcdn.net/jpg/03/02/39/97/360_F_302399784_k69fNY2NhbWLYf3Xg4fUz50docoFAwjk.jpg" },
  { title: "Education", color: "bg-gradient-to-r from-purple-400 to-purple-600",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtuh_xYWw9k0w6dDcXPemYHT27bEIf3PWCJQ&s" },
  { title: "Science", color: "bg-gradient-to-r from-pink-400 to-pink-600",image:"https://www.australianenvironmentaleducation.com.au/wp-content/uploads/2020/03/STEM.jpg" },
  { title: "Business", color: "bg-gradient-to-r from-yellow-400 to-yellow-600",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3NjtF-D7RewBXXaa1mxLz7xaTcyPxEr7RA&s" },
  { title: "Engineering", color: "bg-gradient-to-r from-indigo-400 to-indigo-600",image:"https://miro.medium.com/v2/resize:fit:3200/format:webp/1*lht_D8C-N7voDo7VLPU4uA.jpeg" },
  { title: "Health", color: "bg-gradient-to-r from-red-400 to-red-600",image:"https://www.freedomhealthinsurance.co.uk/getmedia/08c875ef-4c24-4df7-8593-4677c4b9bcc8/World-Health-Day?width=888&height=345&ext=.png" },
  { title: "Design", color: "bg-gradient-to-r from-teal-400 to-teal-600",image:"https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/J0wAgiRrDk8lj7b8uIbRU/80cecee4222d4492712d2e08397dd013/GettyImages-1249256417.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=2&w=1000" },
  { title: "AI & ML", color: "bg-gradient-to-r from-slate-400 to-slate-600",image:"https://cdn-images-1.medium.com/max/800/0*F12vyoUtNC6qE-5j.jpg" },

  // ⭐ NEW 6 CATEGORIES
  { title: "Career Growth", color: "bg-gradient-to-r from-orange-400 to-orange-600" },
  { title: "Motivation", color: "bg-gradient-to-r from-rose-400 to-rose-600" },
  { title: "Web Development", color: "bg-gradient-to-r from-cyan-400 to-cyan-600" },
  { title: "Cloud & DevOps", color: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600" },
  { title: "Cybersecurity", color: "bg-gradient-to-r from-emerald-400 to-emerald-600" },
  { title: "Data Science", color: "bg-gradient-to-r from-violet-400 to-violet-600" },
];


const handleCategoryClick= (category)=>{
    console.log(category)
    setActiveTopic(category)
    setActiveTab(category)
    setCategoryManager(true)
}

  return (
    <div className="w-full min-h-screen flex justify-center items-start md:p-6">
      <div className="w-full max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:p-4 p-2  rounded-xl ">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={()=>handleCategoryClick(cat.title)}
            className={`${cat.color} h-28 rounded-xl w-full cursor-pointer transition-transform duration-200 active:scale-95 hover:shadow-xl flex items-center justify-center text-white text-xl font-semibold saturate-100 contrast-150 `}
            
          >
            <div className="w-full h-full overflow-hidden rounded-xl relative contrast-100">
  <img 
    src={cat.image} 
    
    className="w-full h-full object-cover"
  />

  {/* Optional overlay to make text readable */}
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="absolute bottom-3 left-3 text-white font-semibold text-lg bg-black/40 px-2 rounded-md ">
   <span> {cat.title}</span>
  

  </div>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}