"use client";

import { useOcid } from "@/contexts/OcidContext";
import { fetchCharacterData, fetchCharacterInfo, fetchCharacterStat } from "@/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCharacterStat } from "@/contexts/CharacterStatContext";
import { useCharacterInfo } from "@/contexts/CharacterInfoContext";

const CharacterPage = () => {
  const params = useParams();
  const username = params.username;
  const [decodedUsername, setDecodedUsername] = useState("");
  const { ocid, setOcid } = useOcid();
  const { characterStat, setCharacterStat } = useCharacterStat();
  const [error, setError] = useState<string | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [worldImage, setWorldImage] = useState<string>("");
  const { characterInfo, setCharacterInfo } = useCharacterInfo();
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_MAPLE_API_KEY;

  const callUserOcid = async (username: string) => {
    const decodingUserName = await decodeURIComponent(username);
    await setDecodedUsername(decodingUserName);
    console.log(decodingUserName);
    const { ocid, error } = await fetchCharacterData(apiKey, decodingUserName);
    if (error) {
      setError(error);
    } else {
      await setOcid(ocid);
      await callUserStat();
      await callUserInfo();
      setError(null);
    }
  };

  const callUserStat = async () => {
    if (ocid && apiKey) {
      const { characterStat, error } = await fetchCharacterStat(apiKey, ocid);
      if (error) {
        setError(error);
      } else {
        await setCharacterStat(characterStat);
        console.log(characterStat.final_stat[0].stat_name);
        setError(null);
      }
    }
  };

  const callUserInfo = async () => {
    if( ocid && apiKey ){
      const { characterInfo, error } = await fetchCharacterInfo(apiKey, ocid);
      if (error) {
        setInfoError(error);
      } else {
        await setCharacterInfo(characterInfo);
        console.log(characterInfo);
        setInfoError(null);
      }
    }
  }

  useEffect(() => {
    console.log(typeof username);
    if (typeof username === "string") {
      callUserOcid(username);
    }
  }, [username, ocid]);

  //캐릭터의 요약 정보를 불러온다
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

  return (
    <>
      {!ocid ? (
        <div>Loading... </div>
      ) : (
        <div>
          <h1>Character Page</h1>
          <p>username : {username}</p>
          <p>Username: {decodedUsername}</p>
          <p>Ocid : {ocid}</p>
          <p>{characterStat.final_stat[0].stat_value}</p>
          <p>{characterInfo.character_exp_rate}%</p>
        </div>
      )}
    </>
  );
};

export default CharacterPage;
