import imgImage18 from "./5be78f1a79cbef3bc564fa68c6b139f2f752b153.png";
import imgImage19 from "./bb0a364819916ed9825a78a005aa34d44e29d0f3.png";

function Intro() {
  return (
    <div className="relative shrink-0 w-full" data-name="Intro">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[30px] text-white">
            <p className="leading-[normal]">
              Prompt Engineering for ChatGPT
            </p>
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
            <p className="leading-[normal]">
              Vanderbilt University
            </p>
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
            <p className="leading-[normal]">Issued: Mar.2024</p>
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
    <div
      className="bg-white content-stretch flex items-center overflow-clip p-[2px] relative rounded-[12px] shrink-0"
      data-name="Intro"
    >
      <div
        className="h-[180px] relative shrink-0 w-[240.296px]"
        data-name="image 18"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage18}
        />
      </div>
    </div>
  );
}

function Frame4() {
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
      <div
        className="flex-[1_0_0] min-w-px relative rounded-[10px]"
        data-name="Button"
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <a
              className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-center text-white whitespace-nowrap"
              href="https://drive.google.com/file/d/1a80Z2txZnKfQ8lMi35wCxcLTjm_8Rj7G/view"
              target="_blank"
            >
              <p
                className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] text-[30px] underline"
                role="link"
                tabIndex="0"
              >
                View
              </p>
            </a>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]"
        />
      </div>
      <div
        className="bg-[#946e52] flex-[1_0_0] min-w-px relative rounded-[10px]"
        data-name="Button"
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <a
              className="flex flex-col font-['Kaisei_Decol:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-center text-white whitespace-nowrap"
              href="https://www.coursera.org/account/accomplishments/verify/NZYB3JEK787L"
              target="_blank"
            >
              <p
                className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] text-[30px] underline"
                role="link"
                tabIndex="0"
              >
                Verify
              </p>
            </a>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[10.5px] shadow-[5px_5px_20px_0px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}

function Intro4() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] items-start justify-center overflow-clip p-[2px] relative shrink-0"
      data-name="Intro"
    >
      <div
        className="h-[270.687px] relative shrink-0 w-[350px]"
        data-name="image 19"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage19}
        />
      </div>
      <Frame3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <Intro4 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex items-start justify-between relative size-full">
      <Frame4 />
      <Frame1 />
    </div>
  );
}