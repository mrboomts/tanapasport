import imgPngwing1 from "./41b9e95b557c3da74bb1d0ceca00127931d499e7.png";
import imgUxGoogleDetails from "./2d82f5db16e16df22946880a389eda334b2ab686.png";
import imgUxGoogleBadge from "./b7976f8122d21b5d561fdc5c6281773328840e69.png";

function Intro() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[30px] text-white">
            <p className="leading-[normal]">Google UX Design Professional Certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[22px] text-white">
            <p className="leading-[normal]">Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[22px] text-white">
            <p className="leading-[normal]">Issued: Feb.2022</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[500px]">
      <Intro />
      <Intro1 />
      <Intro2 />
    </div>
  );
}

function Intro3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="h-[120px] relative shrink-0 w-[235.294px]" data-name="pngwing 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[147.06%] left-0 max-w-none top-[-22.81%] w-full" src={imgPngwing1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start justify-center relative self-stretch shrink-0">
      <Frame />
      <Intro3 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <div className="flex-[1_0_0] min-w-px relative rounded-[10px]" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-center text-white whitespace-nowrap" href="https://drive.google.com/file/d/1vMGeood0ZHEfvgI24UbIEC_XFigBABi7/view?usp=sharing" target="_blank">
              <p className="cursor-pointer leading-[normal]">View</p>
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]" />
      </div>
      <div className="bg-[#946e52] flex-[1_0_0] min-w-px relative rounded-[10px]" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-center text-white whitespace-nowrap" href="https://coursera.org/verify/professional-cert/6R6DNFJS8TGB" target="_blank">
              <p className="cursor-pointer leading-[normal]">Verify</p>
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]" />
      </div>
    </div>
  );
}

function Intro4() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <div className="h-[269.231px] relative shrink-0 w-[350px]" data-name="UX Google details">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUxGoogleDetails} />
      </div>
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <div className="flex-[1_0_0] min-w-px relative rounded-[10px]" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-center text-white whitespace-nowrap" href="https://drive.google.com/file/d/1_xRvj3Kx9Xnu3HvhC6VJdQGWGnhKXcF4/view?usp=sharing" target="_blank">
              <p className="cursor-pointer leading-[normal]">View</p>
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]" />
      </div>
      <div className="bg-[#946e52] flex-[1_0_0] min-w-px relative rounded-[10px]" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <a className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-center text-white whitespace-nowrap" href="https://www.credly.com/go/g08grqFM" target="_blank">
              <p className="cursor-pointer leading-[normal]">Verify</p>
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]" />
      </div>
    </div>
  );
}

function Intro5() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center overflow-clip p-[2px] relative shrink-0" data-name="Intro">
      <div className="h-[269.231px] relative shrink-0 w-[350px]" data-name="UX Google badge">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUxGoogleBadge} />
      </div>
      <Frame4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center min-w-px relative">
      <Intro4 />
      <Intro5 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex items-start justify-between relative size-full">
      <Frame5 />
      <Frame1 />
    </div>
  );
}