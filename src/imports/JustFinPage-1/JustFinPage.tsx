import imgCover3 from "./03a65bfd42f6130054b001afb81117c529cd5c4d.png";

function Intro() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[80px] text-left text-white">
            <p className="leading-[100px]">Just Fin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro1() {
  return (
    <div className="bg-white content-stretch flex h-[420px] items-center justify-center overflow-clip relative rounded-[30px] shrink-0 w-[560px]" data-name="Intro">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="cover 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCover3} />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[10px] py-[2px] relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Regular',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#ce1124] text-[12px] text-left">
          <p className="leading-[normal]">* This project is still in development. I can’t share more details because of the company’s asset policies.</p>
        </div>
      </div>
    </div>
  );
}

function Intro2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Intro">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[2px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-left text-white w-full">
            <p className="leading-[normal]">Just Fin is an app-specific for investors who want to provide car loans, and home loans, and give funds to businesses.</p>
          </div>
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative self-stretch">
      <Intro2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
      <Intro1 />
      <Frame4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Intro />
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[10px]">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[40px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-center left-1/2 px-[60px] py-[20px] top-[154px] w-[1440px]" data-name="About me">
      <Frame1 />
    </div>
  );
}

function Intro3() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center left-1/2 overflow-clip p-[2px] top-[72px]" data-name="Intro">
      <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-left text-white whitespace-nowrap">
        <p className="leading-[normal]">Projects</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="-translate-x-1/2 absolute left-1/2 rounded-[10px] top-[858px] w-[150px]" role="button" tabIndex="0" data-name="Button">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[20px] py-[10px] relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
          <p className="leading-[normal]">Close</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]" />
    </div>
  );
}

export default function JustFinPage() {
  return (
    <button className="block cursor-pointer relative size-full" data-name="Just Fin page">
      <AboutMe />
      <Intro3 />
      <Button />
    </button>
  );
}