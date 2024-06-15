export default function Header() {
    return (
      <div className="w-full bg-[#292929] text-blue flex items-center">
        <img className="w-[300px]" src="/logo/logo.png" alt="응안떠~"/>
        <div className="flex ml-6 space-x-4 text-white">
          <a href="/">캐릭터 검색</a>
          <div>경험치 계산</div>
        </div>
      </div>
    );
  }
  