CREATE OR REPLACE PROCEDURE create_app_sandbox (
    p_username IN VARCHAR2,
    p_password IN VARCHAR2
)
AUTHID DEFINER -- Run as ADMIN. Needed to create user
AS
    l_ddl_stmt VARCHAR2(500);
BEGIN
    -- 1) Create user
    l_ddl_stmt := 'CREATE USER ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_username) ||
                  ' IDENTIFIED BY "' || p_password || '" QUOTA 100M ON DATA';
EXECUTE IMMEDIATE l_ddl_stmt;

-- 2) Grants permission to user
l_ddl_stmt := 'GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE, ' ||
                  'CREATE PROCEDURE, CREATE TRIGGER, CREATE TYPE, CREATE SYNONYM TO ' ||
                  DBMS_ASSERT.SIMPLE_SQL_NAME(p_username);
EXECUTE IMMEDIATE l_ddl_stmt;

-- 3) Copy seed tables
l_ddl_stmt := 'CREATE TABLE ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_username) || '.DEPARTMENTS AS SELECT * FROM SBX_OWNER.DEPARTMENTS';
EXECUTE IMMEDIATE l_ddl_stmt;
l_ddl_stmt := 'CREATE TABLE ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_username) || '.STUDENTS AS SELECT * FROM SBX_OWNER.STUDENTS';
EXECUTE IMMEDIATE l_ddl_stmt;
l_ddl_stmt := 'CREATE TABLE ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_username) || '.COURSES AS SELECT * FROM SBX_OWNER.COURSES';
EXECUTE IMMEDIATE l_ddl_stmt;
l_ddl_stmt := 'CREATE TABLE ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_username) || '.ENROLLMENTS AS SELECT * FROM SBX_OWNER.ENROLLMENTS';
EXECUTE IMMEDIATE l_ddl_stmt;

-- 4) Enable ORDS on the new schema
ORDS.ENABLE_SCHEMA(
        p_enabled             => TRUE,
        p_schema              => p_username,
        p_url_mapping_type    => 'BASE_PATH',
        p_url_mapping_pattern => LOWER(p_username),
        p_auto_rest_auth      => FALSE
    );

COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        -- Log or raise the error appropriately
        RAISE_APPLICATION_ERROR(-20001, 'Error creating sandbox for ' || p_username || ': ' || SQLERRM);
END;
/