import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/profile/", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
   <div className="max-w-xl mx-auto bg-white rounded-3xl 
                shadow-lg border border-emerald-100 
                p-8">

  {/* Header */}
  <div className="flex items-center gap-4 mb-6">
    {/* Avatar */}
    <div className="w-16 h-16 rounded-full 
                    bg-linear-to-br from-emerald-500 to-teal-600 
                    text-white text-2xl font-bold 
                    flex items-center justify-center shadow">
      {user.username?.[0]?.toUpperCase()}
    </div>

    {/* Title */}
    <div>
      <h2 className="text-2xl font-bold text-teal-900">
        My Profile
      </h2>
      <p className="text-sm text-teal-600">
        Account Information
      </p>
    </div>
  </div>

  {/* Info Section */}
  <div className="space-y-4">

    <div className="flex justify-between items-center 
                    bg-emerald-50 rounded-xl px-4 py-3">
      <span className="text-sm text-teal-700 font-medium">
        Username
      </span>
      <span className="text-teal-900 font-semibold">
        {user.username}
      </span>
    </div>

    <div className="flex justify-between items-center 
                    bg-emerald-50 rounded-xl px-4 py-3">
      <span className="text-sm text-teal-700 font-medium">
        Email
      </span>
      <span className="text-teal-900 font-semibold">
        {user.email}
      </span>
    </div>

    <div className="text-sm text-gray-500 text-center pt-2">
      Joined on {new Date(user.date_joined).toDateString()}
    </div>
  </div>
</div>

  );
};

export default Profile;
