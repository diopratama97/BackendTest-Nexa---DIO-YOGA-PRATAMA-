CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `gmedia_democase`.`karyawan_DIO_YOGA_PRATAMA` AS
select
    `gmedia_democase`.`karyawan`.`nip` AS `Nip`,
    `gmedia_democase`.`karyawan`.`nama` AS `Nama`,
    `gmedia_democase`.`karyawan`.`alamat` AS `Alamat`,
    `gmedia_democase`.`karyawan`.`tgl_lahir` AS `Tanggal_lahir`,
    case
        when `gmedia_democase`.`karyawan`.`gend` = 'L' then 'Laki-laki'
        when `gmedia_democase`.`karyawan`.`gend` = 'P' then 'Perempuan'
        else `gmedia_democase`.`karyawan`.`gend`
    end AS `Gend`
from
    `gmedia_democase`.`karyawan`;