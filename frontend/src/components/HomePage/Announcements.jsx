import React from 'react';

const announcements = [
  "COVID-19 vaccination now available for all adults. Book your slot today!",
  "New pediatric wing opening next month.",
  "Health camp scheduled for next weekend. Free check-ups available."
];

function Announcements() {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Latest Announcements</h2>
      <ul className="list-disc pl-5">
        {announcements.map((announcement, index) => (
          <li key={index} className="mb-2">{announcement}</li>
        ))}
      </ul>
    </section>
  );
}

export default Announcements;