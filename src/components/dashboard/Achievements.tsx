interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
}

interface Props {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="flex items-center p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex-shrink-0 text-2xl mr-4">
            {achievement.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {achievement.title}
            </p>
            <p className="text-sm text-gray-500">
              {achievement.description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      
      {achievements.length === 0 && (
        <div className="col-span-2 text-center py-4 text-gray-500">
          No achievements yet. Keep learning to earn badges!
        </div>
      )}
    </div>
  );
}
