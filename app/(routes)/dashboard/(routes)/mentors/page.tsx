"use client";

import { getUserByRole } from '@/lib/data/user';
import React, { useState, useEffect } from 'react';
import MentorCard from './_components/mentor-card';
import Search from './_components/search';
import { MentorCardSkeleton } from '@/components/skeletons';

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const fetchedMentors = await getUserByRole("MENTOR");
        setMentors(fetchedMentors || []);
        setFilteredMentors(fetchedMentors || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentors: ", error);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const filtered = mentors.filter(mentor =>
      (
        mentor.education?.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.education?.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
        mentor.education?.institution.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredMentors(filtered);
  }, [searchQuery, mentors]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Mentor</h1>
      <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <MentorCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {filteredMentors.length === 0 ? (
            <div className="text-center mt-8 text-gray-600">No mentors found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Mentors;
