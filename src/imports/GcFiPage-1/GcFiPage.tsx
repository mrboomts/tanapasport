import imgIntro from "./eae313a48883a46e7a2a60ee806e73a8052191be.png";
import imgPresentMobile1 from "./13bb1669546c3334d6e12d9c7b46c41a32fd5304.png";
import imgTablet1 from "./75a5b36ca63f107ab14eac0b0d06e02610c29196.png";

function Intro() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[80px] text-left text-white">
            <p className="leading-[100px]">GCFi [Golden Cloud Finance]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro1() {
  return (
    <div className="content-stretch flex h-[200px] items-center justify-center overflow-clip relative rounded-[20px] shrink-0 w-[270px]" data-name="Intro">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgIntro} />
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="present-mobile 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPresentMobile1} />
      </div>
    </div>
  );
}

function Intro2() {
  return (
    <div className="content-stretch flex h-[200px] items-center justify-center overflow-clip relative rounded-[20px] shrink-0 w-[270px]" data-name="Intro">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgIntro} />
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Tablet 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgTablet1} />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <Intro1 />
      <Intro2 />
    </div>
  );
}

function Intro3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Intro">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Regular',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[22px] text-left text-white">
            <p className="leading-[normal]">GCFi is a cryptocurrency finance app and website that provides the most of features that people want to use in one app with a simple interface. Give you more security with a hardware wallet connection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch cursor-pointer flex items-center relative shrink-0 w-[300px]" role="link" tabIndex="0">
      <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[10px]" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#946e52] text-[18px] text-center whitespace-nowrap">
              <p className="leading-[normal]">View UX (Website)</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#946e52] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <div className="bg-[#946e52] cursor-pointer flex-[1_0_0] min-w-px relative rounded-[10px]" role="link" tabIndex="0" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
              <p className="leading-[normal]">View prototype (App)</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[10px]" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="cursor-pointer flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#946e52] text-[18px] text-center whitespace-nowrap" role="link" tabIndex="0">
              <p>
                <span className="leading-[normal]">View UX</span>
                <span className="leading-[normal]">{` `}</span>
                <span className="leading-[normal]">(App)</span>
              </p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#946e52] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
      <div className="bg-white cursor-pointer flex-[1_0_0] min-w-px relative rounded-[10px]" role="link" tabIndex="0" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#946e52] text-[18px] text-center whitespace-nowrap">
              <p className="leading-[normal]">View Figma file (App)</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#946e52] border-solid inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[50px] items-start min-w-px relative self-stretch">
      <Intro3 />
      <Frame8 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
      <Frame7 />
      <Frame6 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Intro />
      <Frame5 />
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

function Intro4() {
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

export default function GcFiPage() {
  return (
    <button className="block cursor-pointer relative size-full" data-name="GCFi page">
      <AboutMe />
      <Intro4 />
      <Button />
    </button>
  );
}