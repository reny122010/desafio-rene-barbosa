"use client";

export default function Level({ statistic }: any) {
  const defineLevel = () => {

    const { goals, assists, appearances } = statistic ?? {};
    const points = goals + assists + appearances * 5;

    console.log(points, statistic)

    if (points < 15) return 'Bronze';
    if (points >= 15 && points <= 29) return 'Prata';
    if (points >= 30) return 'Ouro';

    return 'Não definido';
  }

  return (
    <div className="flex space-x-4">
      <p className='text-black'>Level {defineLevel()}</p>
    </div>
  );
}