import svgPaths from "./svg-8pdtd5ddv0";

function Intro() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0 w-[500px]" data-name="Intro">
      <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[30px] text-white">
        <p className="leading-[normal]">Mail:</p>
      </div>
    </div>
  );
}

function Intro1() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white whitespace-nowrap" href="mailto:tanapas.sup@gmail.com" target="_blank">
        <p className="cursor-pointer leading-[normal]">tanapas.sup@gmail.com</p>
      </a>
    </div>
  );
}

function FaSolidHandPointRight() {
  return (
    <div className="relative size-[30px]" data-name="fa-solid:hand-point-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="fa-solid:hand-point-right">
          <path d={svgPaths.p3be813c0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Intro2() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Click to send mail to me</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <FaSolidHandPointRight />
        </div>
      </div>
      <Intro2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center min-w-px relative self-stretch">
      <Intro1 />
      <Frame7 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
      <Intro />
      <Frame />
    </div>
  );
}

function Intro3() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0 w-[500px]" data-name="Intro">
      <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[30px] text-white">
        <p className="leading-[normal]">Phone:</p>
      </div>
    </div>
  );
}

function Intro4() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white whitespace-nowrap" href="https://065-857-1555" target="_blank">
        <p className="cursor-pointer leading-[normal]">065-857-1555</p>
      </a>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative self-stretch">
      <Intro4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
      <Intro3 />
      <Frame3 />
    </div>
  );
}

function Intro5() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0 w-[500px]" data-name="Intro">
      <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[30px] text-white">
        <p className="leading-[normal]">LinkedIn:</p>
      </div>
    </div>
  );
}

function Intro6() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white whitespace-nowrap" href="https://www.linkedin.com/in/tanapas-suppamongkol-1958b5212/" target="_blank">
        <p className="cursor-pointer leading-[normal]">Tanapas Suppamongkol</p>
      </a>
    </div>
  );
}

function FaSolidHandPointRight1() {
  return (
    <div className="relative size-[30px]" data-name="fa-solid:hand-point-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="fa-solid:hand-point-right">
          <path d={svgPaths.p3be813c0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Intro7() {
  return (
    <div className="content-stretch flex items-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Click to my LikedIn page</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <FaSolidHandPointRight1 />
        </div>
      </div>
      <Intro7 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center min-w-px relative self-stretch">
      <Intro6 />
      <Frame8 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
      <Intro5 />
      <Frame5 />
    </div>
  );
}

export default function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full">
      <Frame1 />
      <Frame2 />
      <Frame4 />
    </div>
  );
}