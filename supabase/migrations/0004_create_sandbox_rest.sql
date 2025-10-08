BEGIN
    -- 1) Define the Module
    ORDS.DEFINE_MODULE(
        p_module_name    => 'sandbox_management',
        p_base_path      => 'sandbox/v1/',
        p_items_per_page => 0
    );

    -- 2) Define the Template (e.g., /sandbox/v1/create/)
    ORDS.DEFINE_TEMPLATE(
        p_module_name    => 'sandbox_management',
        p_pattern        => 'create/'
    );

    -- 3) Define the Handler (HTTP POST method)
    ORDS.DEFINE_HANDLER(
        p_module_name    => 'sandbox_management',
        p_pattern        => 'create/',
        p_method         => 'POST',
        p_source_type    => ORDS.SOURCE_TYPE_PLSQL,
        p_source         => 'BEGIN create_app_sandbox(p_username => :USER_ID, p_password => :PASSWORD); END;',
        p_items_per_page => 0
    );

COMMIT;
END;
/