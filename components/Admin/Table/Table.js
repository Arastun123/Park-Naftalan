"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Button from "@/components/Button/Button";
import table from "@/styles/table.module.scss";

export default function Table({ data, th, handleDelete, createSlug }) {
  const router = useRouter();
  return (
    <table className={table.table}>
      <thead className={table.thead}>
        <tr>
          {th.map((item) => (
            <th className={table.th} key={item}>
              {item}
            </th>
          ))}
          <th className={table.th}>Action</th>
          <th className={table.th}>
            <Link
              className={`${table.actionBtn} ${table.create}`}
              href={`${createSlug}/create`}
            >
              Create
            </Link>
          </th>
        </tr>
      </thead>
      {data !== "" ? (
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={table.trHover}>
              {th.map((item) => (
                <td key={item} className={table.td}>
                  {row[item]}
                </td>
              ))}
              <td className={table.td}>
                <Button
                  className={`${table.actionBtn} ${table.edit}`}
                  onClick={() => {
                    createSlug === "equipment"
                      ? router.push(`${createSlug}/${row.id}/${row.language}`)
                      : router.push(`${createSlug}/${row.id}`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className={`${table.actionBtn} ${table.delete}`}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <h2>Hazırda yaradılmış məlumat yoxdur zəhmət olmasa əlavə edin</h2>
      )}
    </table>
  );
}
