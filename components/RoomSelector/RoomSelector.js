"use clent";
import { useEffect, useState } from "react";

import SelectBox from "../SelecBox";

export default function RoomSelector({
  t,
  handleRoomSelect,
  selectedRoom,
  rooms,
}) {
  const [currency, setCurrecy] = useState(0.5877);

  useEffect(() => {
    // const getCurrency = async () => {
    //   const currency = await getAznToUsdRate();
    //   if (currency) setCurrecy(currency);
    // };
    // getCurrency();
  }, []);

  return (
    <div>
      <SelectBox
        optionData={rooms}
        name={t?.ChooseRoom}
        value={selectedRoom}
        onChange={handleRoomSelect}
        label={t?.ChooseRoom}
      />
    </div>
  );
}
