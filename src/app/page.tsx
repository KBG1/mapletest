// src/app/page.tsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOcid } from "../contexts/OcidContext"; // 대소문자를 정확히 맞춰서 import

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [worldImage, setWorldImage] = useState<string>("");
  const [characterName, setCharacterName] = useState<string>("");
  const [characterInfo, setCharacterInfo] = useState<any>(null);
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_MAPLE_API_KEY;
  const router = useRouter();
  const { ocid, setOcid } = useOcid();

  const fetchCharacterData = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      axios
        .get("https://open.api.nexon.com/maplestory/v1/id", {
          headers: {
            "x-nxopen-api-key": apiKey,
          },
          params: {
            character_name: characterName,
          },
        })
        .then((response) => {
          setOcid(response.data.ocid);
          setError(null);
        })
        .catch((error) => {
          setError("Error fetching data: " + error.message);
        });
    } else {
      setError("API key is not defined");
    }
  };

  useEffect(() => {
    if (ocid && apiKey) {
      axios
        .get("https://open.api.nexon.com/maplestory/v1/character/basic", {
          headers: {
            "x-nxopen-api-key": apiKey,
          },
          params: {
            ocid: ocid,
          },
        })
        .then((res) => {
          setCharacterInfo(res.data);
          setWorldImage(`./server/${res.data.world_name}.png`);
          setError(null);
        })
        .catch((error) => {
          setError("Error fetching character info: " + error.message);
        });
    }
  }, [ocid, apiKey]);

  const goToCharacterPage = (characterInfo: any) => {
    console.log(characterInfo.character_name);
    router.push(`charater/${characterInfo.character_name}`);
  };

  return (
    <div className="w-[500px] ml-auto mr-auto border border-gray-500 text-center rounded-2xl mt-[100px]">
      <h1 className="p-4">유저 검색</h1>
      <form onSubmit={fetchCharacterData}>
        <input
          className="border border-black px-1 rounded-2xl text-center w-[150px]"
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="닉네임 입력"
        />
        <button
          type="submit"
          className="ml-2 border border-black px-1 rounded-2xl hover:bg-gray-400"
        >
          검색
        </button>
      </form>

      {error && <div>{error}</div>}
      {!ocid && !error && (
        <div className="p-4">
          캐릭터 명을 입력하시면 캐릭터 정보가 나옵니다!
          <br />
          <span className="text-sm text-[#292453]">
            오래 접속하지 않은 캐릭터는 검색이 되지 않습니다.
          </span>
        </div>
      )}
      {characterInfo && (
        <div className="p-4 mt-10">
          {characterInfo ? (
            <div>
              <h2>캐릭터 정보</h2>
              <div className="flex items-center justify-center mr-4">
                <img src={characterInfo.character_image} alt="없는뎅?" />
                <p>닉네임 : {characterInfo.character_name}</p>
              </div>
              <p className="flex justify-center">
                서버 : <img src={worldImage} alt="사진없음" className="w-6 p-1" />
                {characterInfo.world_name}
              </p>
              <p>레벨 : {characterInfo.character_level}</p>
              <p>경험치량 : {characterInfo.character_exp}</p>
              <p>현재 경험치 : {characterInfo.character_exp_rate} / 100%</p>
              <button className="text-xs mt-5" onClick={() => goToCharacterPage(characterInfo)}>
                캐릭터 정보 자세히 보기 {'>'}
              </button>
            </div>
          ) : (
            <div>로딩중...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
