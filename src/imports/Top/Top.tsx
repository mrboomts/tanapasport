import svgPaths from "./svg-l4k4b8i2gs";

function Name() {
  return (
    <div className="bg-[rgba(0,0,0,0.1)] h-full relative rounded-[10px] shrink-0" data-name="Name">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[40px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Boom</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Name1() {
  return (
    <div className="h-full relative rounded-[10px] shrink-0" data-name="Name">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Kaisei_Decol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white whitespace-nowrap">
            <p className="leading-[normal]">
              Tanapas
              <br aria-hidden="true" />
              Suppamongkol
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[rgba(0,0,0,0.1)] content-stretch flex h-[106px] items-center relative rounded-[10px] shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Name />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Name1 />
      </div>
    </div>
  );
}

function TablerMailFilled() {
  return (
    <div className="overflow-clip relative shrink-0 size-[40px]" data-name="tabler:mail-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p13e9e00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p113770c0} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[24px] text-[rgba(255,255,255,0)] text-center top-1/2 whitespace-nowrap" href="mailto:tanapas.sup@gmail.com" target="_blank">
        <p className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline">MA</p>
      </a>
    </div>
  );
}

function UilLinkedin() {
  return (
    <div className="overflow-clip relative shrink-0 size-[40px]" data-name="uil:linkedin">
      <div className="absolute inset-[8.33%_8.58%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.1333 33.3338">
          <path d={svgPaths.p244da300} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <a className="absolute flex flex-col font-['Kaisei_Decol:Bold',sans-serif] inset-[6.25%_20%] justify-center leading-[0] not-italic text-[24px] text-[rgba(255,255,255,0)] text-center whitespace-nowrap" href="https://www.linkedin.com/in/tanapas-suppamongkol-1958b5212/" target="_blank">
        <p className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline">in</p>
      </a>
    </div>
  );
}

function Social() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-center relative shrink-0" data-name="Social">
      <TablerMailFilled />
      <UilLinkedin />
    </div>
  );
}

function CiMenuAlt() {
  return (
    <div className="relative shrink-0 size-[80px]" data-name="ci:menu-alt-05">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="ci:menu-alt-05">
          <path d={svgPaths.p3f21ab00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[2px] relative shrink-0" data-name="Menu">
      <CiMenuAlt />
    </div>
  );
}

function MenuHamburger() {
  return (
    <button className="content-stretch cursor-pointer flex items-center justify-end relative shrink-0" data-name="Menu hamburger">
      <Menu />
    </button>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-end relative shrink-0 w-[773px]">
      <Social />
      <MenuHamburger />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px relative w-full">
      <Frame5 />
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#946e52] content-stretch flex flex-col h-[200px] items-end justify-center mb-[-1px] overflow-clip pb-[10px] pt-[30px] px-[100px] relative shrink-0 w-[1440px]">
      <Frame4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-full">
      <button className="relative shrink-0 w-full" data-name="Menu">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">
              <p className="leading-[normal]">Home</p>
            </div>
          </div>
        </div>
      </button>
      <button className="relative shrink-0 w-full" data-name="Menu">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">
              <p className="leading-[normal]">Experience</p>
            </div>
          </div>
        </div>
      </button>
      <button className="relative shrink-0 w-full" data-name="Menu">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">
              <p className="leading-[normal]">Projects</p>
            </div>
          </div>
        </div>
      </button>
      <button className="relative shrink-0 w-full" data-name="Menu">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">
              <p className="leading-[normal]">Certifications</p>
            </div>
          </div>
        </div>
      </button>
      <button className="relative shrink-0 w-full" data-name="Menu">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative size-full">
            <div className="flex flex-col font-['Kaisei_Decol:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">
              <p className="leading-[normal]">About me</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#946e52] content-stretch flex flex-col items-center justify-center mb-[-1px] overflow-clip pb-[10px] pt-[30px] px-[100px] relative rounded-bl-[20px] rounded-br-[20px] shrink-0 w-[1440px]">
      <Frame2 />
    </div>
  );
}

export default function Top() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative size-full" data-name="Top">
      <Frame />
      <Frame1 />
    </div>
  );
}