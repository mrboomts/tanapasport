import svgPaths from "./svg-r5c6ot2uf7";
import imgCover2 from "./1bdd84ab3b9eb4e195e924761b263aea26cddc8c.png";

function Intro() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[80px] text-left text-white">
            <p className="leading-[100px]">Just (Super app)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro1() {
  return (
    <div className="bg-white content-stretch flex h-[420px] items-center justify-center overflow-clip relative rounded-[30px] shrink-0 w-[560px]" data-name="Intro">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="cover 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCover2} />
      </div>
    </div>
  );
}

function Intro2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[2px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-left text-white w-full">
            <p className="leading-[normal]">
              {`Just is a super app that provides a cars market, car bidding (now available), and car loans, home loans, and car services (in the future). The company’s target is to make this app all about Thailand's second-hand cars complete service.`}
              <br aria-hidden="true" />
              <br aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[2px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-left text-white w-full">
            <p className="leading-[normal]">The app is now available to download.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MingcuteAppstoreFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[30px]" data-name="mingcute:appstore-fill">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p2f828580} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1468e5] flex-[1_0_0] min-w-px relative rounded-[10px]" role="link" tabIndex="0" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Download on App store</p>
          </div>
          <MingcuteAppstoreFill />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
    </div>
  );
}

function IonLogoGooglePlaystore() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="ion:logo-google-playstore">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="ion:logo-google-playstore">
          <path d={svgPaths.p2834ec00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#307353] flex-[1_0_0] min-w-px relative rounded-[10px]" role="link" tabIndex="0" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Download on Play store</p>
          </div>
          <IonLogoGooglePlaystore />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[10px] items-center relative shrink-0 w-full">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Intro3 />
      <Frame6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-w-px relative self-stretch">
      <Intro2 />
      <Frame7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[50px] items-start relative shrink-0 w-full">
      <Intro1 />
      <Frame5 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Intro />
      <Frame4 />
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

function Button2() {
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

export default function JustPage() {
  return (
    <button className="block cursor-pointer relative size-full" data-name="Just page">
      <AboutMe />
      <Intro4 />
      <Button2 />
    </button>
  );
}