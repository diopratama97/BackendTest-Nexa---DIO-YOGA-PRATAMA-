CREATE PROCEDURE gmedia_democase.sp_add_kary_DIO_YOGA_PRATAMA(	
	nip VARCHAR(50), nama VARCHAR(200), alamat VARCHAR(200),
	gend ENUM('L','P'), photo TEXT, tgl_lahir DATE
)
BEGIN
	START TRANSACTION;
	
		INSERT INTO karyawan (nip,nama,alamat,gend,photo,tgl_lahir) 
    	VALUES (nip,nama,alamat,gend,photo,tgl_lahir);
    
    	INSERT INTO log_trx_api (api,insert_at) 
    	VALUES ("store_procedure_dio_yoga_pratama",NOW());
    
    COMMIT;
END