const PlanCard = ({ nome, descricao }) => {
  const imageName = nome.toLowerCase().replace(/\s+/g, '') + '.png';

  const imageSrc = new URL(`../assets/convenios/${imageName}`, import.meta.url).href;

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-full sm:w-full lg:w-auto h-45 lg:h-40 px-6 sm:px-6 lg:px-0 2xl:h-45 rounded-md overflow-hidden flex items-center justify-center shadow-md shadow-black/10 border border-gray-300">
          <img src={imageSrc} alt={nome} className="w-full sm:w-full lg:w-2/3 object-contain" />
        </div>
        <span className="text-center lg:text-md 2xl:text-lg text-slate-800 tracking-wide">{descricao}</span>
      </div>
    </>

  );
};

export default PlanCard;
