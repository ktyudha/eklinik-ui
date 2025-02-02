import { format } from "date-fns";
import { id } from "date-fns/locale";

export function formattedDate(date: string) {
  return format(new Date(date), "dd MMMM yyyy", { locale: id });
}

export function formattedDateTime(date: string) {
  return format(new Date(date), "dd MMMM yyyy HH:mm", { locale: id });
}

export function formattedDateTime2(date: string): string {
  const parsedDate = new Date(date); // Mengonversi string ke objek Date

  const weekday = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    parsedDate
  );
  const day = new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(
    parsedDate
  );
  const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    parsedDate
  );
  const year = new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(
    parsedDate
  );
  const time = parsedDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${weekday}, ${day} ${month} ${year} ${time} WIB`;
}

export function formatDateToDDMMYYYY(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// export function formatToInputDate(dateString: string): string {
//   const date = new Date(dateString);{ locale: id }
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const day = date.getDate().toString().padStart(2, '0');
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');

//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// }

export function formatToInputDate(date: string) {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm", { locale: id });
}
