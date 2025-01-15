export function formattedQuestion(param: string) {
  const replacements: { [key: string]: string } = {
    '**answer-option-with-input**': '', // Radio dengan opsi input text
    '**disabled-all**': '', // Checkbox dengan opsi disabled semua jawaban
    '**select-country**': '', // Negara
    '**select-province**': '', // Provinsi
    '**select-city**': '', // Kabupaten / Kota
    '**select-university**': '', // Perguruan Tinggi Dalam Negeri
    '**select-department**': '', // Program Studi Dalam Negeri
    '**overseas-university**': '', // Perguruan Tinggi Luar Negeri
    '**overseas-department**': '', // Program Studi Luar Negeri
    '**department-grade**': '', // Jenjang Program Studi
    '**registration-type**': '', // Jalur Seleksi
    '**input-nim**': '', // NIM Perguruan Tinggi Dalam Negeri
    '**study**': '',
    '**study-location**': '',
    '**study-time**': '',
    '**study-reason**': '',
    '**study-business-reason**': '',
    '**study-harmony**': '',
    '**form-activity**': '',
    '**form-business**': '',
    '**entrepreneurship-field**': '',
    '**business-or-work**': '',
    '**business-location**': '',
    '**business-time**': '',
    '**business-average-income**': '',
    '**business-average-turnover**': '',
    '**business-status**': '',
    '**business-harmony**': '',
  };

  for (const key in replacements) {
    if (param.includes(key)) {
      return param.replace(key, replacements[key]);
    }
  }

  return param;
}