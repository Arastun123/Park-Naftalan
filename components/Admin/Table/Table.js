"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button/Button";
import table from "@/styles/table.module.scss";
import { logoutAdmin } from "@/lib/handleApiActions";
import { useMemo } from "react";

export default function Table({ data, th, handleDelete, createSlug }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/naftalanPark");
  };

  console.log(data);
  const normalizedData = Array.isArray(data) ? data : [data];

  const idColorMap = useMemo(() => {
    const colors = ["color1", "color2", "color3", "color4", "color5"];
    const map = {};
    let colorIndex = 0;
    normalizedData.forEach((item) => {
      if (item?.id) {
        const id = item.id;
        if (!map[id]) {
          map[id] = colors[colorIndex % colors.length];
          colorIndex++;
        }
      }
    });
    return map;
  }, [normalizedData]);

  return (
    <>
      <Button
        className={`${table.actionBtn} ${table.edit}`}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <table className={table.table}>
        <thead className={table.thead}>
          <tr>
            {th.map((item) => (
              <th className={table.th} key={item}>
                {item}
              </th>
            ))}
            <th className={table.th}>Action</th>
            {createSlug !== "about" && (
              <th className={table.th}>
                <Link
                  className={`${table.actionBtn} ${table.create}`}
                  href={`${createSlug}/create`}
                >
                  Create
                </Link>
              </th>
            )}
          </tr>
        </thead>
        {normalizedData.length > 0 ? (
          <tbody>
            {[...normalizedData].reverse().map((row, i) => {
              const rowColorClass = row?.id ? table[idColorMap[row.id]] : "";
              return (
                <tr key={i} className={`${table.trHover} ${rowColorClass}`}>
                  {th.map((item) => (
                    <td key={item} className={table.td}>
                      {row[item] ?? "-"}
                    </td>
                  ))}
                  <td className={table.td}>
                    <Button
                      className={`${table.actionBtn} ${table.edit}`}
                      onClick={() => {
                        router.push(`${createSlug}/${row.id || ""}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className={`${table.actionBtn} ${table.delete}`}
                      onClick={() => handleDelete(row.id)}
                      disabled={!row.id}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={th.length + 2} className={table.td}>
                Hazırda yaradılmış məlumat yoxdur, zəhmət olmasa əlavə edin.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}
