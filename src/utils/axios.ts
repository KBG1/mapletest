import axios from "axios";
// 캐릭터의 닉네임에 해당하는 ocid를 찾는다.
const fetchCharacterData = async (apiKey: string, characterName: string) => {
    const start = performance.now();
    try {
      const res = await axios.get("https://open.api.nexon.com/maplestory/v1/id", {
        headers: {
          "x-nxopen-api-key": apiKey,
        },
        params: {
          character_name: characterName,
        },
      });
      console.log("API 요청 시간:", performance.now() - start, "ms");
      return { ocid: res.data.ocid, error: null };
    } catch (error) {
      console.log("API 요청 시간 (실패):", performance.now() - start, "ms");
      if (error instanceof Error) {
        return { ocid: null, error: "데이터 불러오기 실패: " + error.message };
      } else {
        return { ocid: null, error: "다른 에러 발생..." };
      }
    }
  };

const fetchCharacterStat = async (apiKey: string, ocid: string) => {
    const start = performance.now();
    try {
        const res = await axios.get("https://open.api.nexon.com/maplestory/v1/character/stat", {
            headers: {
                "x-nxopen-api-key": apiKey,
            },
            params: {
                ocid: ocid,
            },
        });
        console.log("API 요청 시간:", performance.now() - start, "ms");
        return { characterStat: res.data, error: null };
    }catch (error) {
        console.log("API 요청 시간 (실패):", performance.now() - start, "ms");
        if (error instanceof Error){
            return { characterStat: null, error: "데이터 불러오기 실패" + error.message};
        }
        else{
            return { characterStat: null, error: "다른에러인거같은데?"};
        }
    }
};

const fetchCharacterInfo = async (apiKey: string, ocid: string) => {
    const start = performance.now();
    try {
        const res = await axios.get("https://open.api.nexon.com/maplestory/v1/character/basic", {
            headers: {
                "x-nxopen-api-key": apiKey,
            },
            params: {
                ocid: ocid,
            },
        });
        console.log("API 요청 시간:", performance.now() - start, "ms");
        return { characterInfo: res.data, error: null };
    }catch (error) {
        console.log("API 요청 시간 (실패):", performance.now() - start, "ms");
        if (error instanceof Error){
            return { characterInfo: null, error: "데이터 불러오기 실패" + error.message};
        }
        else{
            return { characterInfo: null, error: "다른에러인거같은데?"};
        }
    }
}

export { fetchCharacterData, fetchCharacterStat, fetchCharacterInfo } ;
