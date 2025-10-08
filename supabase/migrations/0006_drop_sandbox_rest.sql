BEGIN
    -- Define a new Template for the delete operation (e.g., /sandbox/v1/destroy/)
    ORDS.DEFINE_TEMPLATE(
        p_module_name    => 'sandbox_management',
        p_pattern        => 'destroy/'
    );

    -- Define the Handler (HTTP DELETE method)
    ORDS.DEFINE_HANDLER(
        p_module_name    => 'sandbox_management',
        p_pattern        => 'destroy/',
        p_method         => 'DELETE', -- Using DELETE is standard for resource destruction
        p_source_type    => ORDS.SOURCE_TYPE_PLSQL,
        -- The ORDS handler maps the incoming JSON body variable to the PL/SQL parameter
        p_source         => 'BEGIN drop_app_sandbox(p_username => :USER_ID); END;',
        p_items_per_page => 0
    );

COMMIT;
END;
/