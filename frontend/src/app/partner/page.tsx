'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import RelationshipCheckIn from '@/components/RelationshipCheckIn';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { PartnerCheckIn } from '@/types';

export default function PartnerPage() {
  const { user } = useUser();
  const [partnerName, setPartnerName] = useState<string>('');
  const [checkIns, setCheckIns] = useState<PartnerCheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartnerData() {
      if (!user) return;

      try {
        const response = await fetch(`/api/partner/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch partner data');
        }
        const data = await response.json();
        setPartnerName(data.partnerName);
        setCheckIns(data.checkIns);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPartnerData();
  }, [user]);

  const handleCheckInSubmit = async (data: {
    communication: number;
    qualityTime: number;
    notes: string;
  }) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/partner/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save check-in');
      }

      const newCheckIn = await response.json();
      setCheckIns((prev) => [newCheckIn, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!partnerName) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Partner Connected
          </h1>
          <p className="text-gray-600">
            Connect with your partner to start tracking your relationship progress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Relationship Check-in with {partnerName}
      </h1>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            How's your relationship today?
          </h2>
          <RelationshipCheckIn onSubmit={handleCheckInSubmit} />
        </div>

        {checkIns.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Check-ins
            </h2>
            <div className="space-y-4">
              {checkIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(checkIn.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-900">{checkIn.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Communication</p>
                      <p className="text-gray-900">{checkIn.communication}/5</p>
                      <p className="text-sm text-gray-500 mt-2">Quality Time</p>
                      <p className="text-gray-900">{checkIn.qualityTime}/5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 