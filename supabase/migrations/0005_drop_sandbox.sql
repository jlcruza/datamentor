CREATE OR REPLACE PROCEDURE drop_app_sandbox (
    p_username IN VARCHAR2
)
AUTHID DEFINER -- Run as ADMIN. Needed to delete user
AS
    l_ddl_stmt VARCHAR2(500);
BEGIN
    l_ddl_stmt := 'DROP USER ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_username) || ' CASCADE';
EXECUTE IMMEDIATE l_ddl_stmt;

COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        -- Handle the case where the user might not exist (ORA-01918)
        IF SQLCODE = -1918 THEN
            -- User does not exist, safe to ignore and still return success to the Edge Function
            NULL;
ELSE
            -- Log or raise the error for genuine failures
            RAISE_APPLICATION_ERROR(-20002, 'Error dropping sandbox for ' || p_username || ': ' || SQLERRM);
END IF;
END;
/