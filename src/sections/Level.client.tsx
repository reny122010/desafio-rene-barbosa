"use client";

export default function Level({ statistic, playerId, setPhase }: any) {
  const defineLevel = () => {

    const { goals, assists, appearances } = statistic ?? {};
    const points = goals + assists + appearances * 5;

    console.log(points, statistic)

    if (points < 15) return 'Bronze';
    if (points >= 15 && points <= 29) return 'Prata';
    if (points >= 30) return 'Ouro';

    return 'Não definido';
  }

  const backStep = () => {
    setPhase(2)
  }

  return (
    <div className="flex space-x-4">
      <p className='text-black'>Level {defineLevel()} - Player id: {playerId}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={backStep}
      >
        Voltar
      </button>
    </div>
  );
}