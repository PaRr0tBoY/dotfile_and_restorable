SELECT SNAME, GRADE
FROM S INNER JOIN SC
ON S.SNO = SC.SNO

SELECT SNO
FROM SC INNER JOIN C
ON C.CNO = SC.CNO
WHERE CNAME = '数据库原理与应用'

SELECT SNAME, CNAME, GRADE
FROM SC JOIN S ON S.SNO = SC.SNO
				JOIN C ON C.CNO = SC.CNO
WHERE C.CNO = '0211'

SELECT CNO, AVG(GRADE) AS AVGRADE
FROM SC INNER JOIN S
ON S.SNO = SC.SNO
WHERE SDEPT = '软件'
GROUP BY SC.CNO

SELECT A.SNO
FROM SC A JOIN SC B
ON A.SNO = B.SNO
WHERE A.CNO = '0121'
AND B.CNO = '0125'

SELECT A.CNO B.PRECNO
FROM C A INNER JOIN C B
ON A.PRECNO = B.CNO

SELECT SNO, CNO, GRADE
FROM SC
WHERE GRADE = (SELECT MAX(GRADE)
							 FROM SC;);

SELECT SNO
FROM SC
WHERE CNO = '0211' 
AND GRADE = (SELECT GRADE
						 FROM SC
						 WHERE SNO = '20140123'
						 AND CNO = '0211')
AND SNO<> '20140123';

SELECT SNAME, BIRTHYEAR
FROM S
WHERE BIRTHYEAR = (SELECT MAX(BIRTHYEAR)
									 FROM S);

CREATE TRIGGER AAA
ON S
AFTER INSERT, UPDATE
AS
	IF EXISTS(SELECT *
	          FROM S
	          GROUP BY SNAME,SCLASS
	          HAVING COUNT(*) > 1
	   )
	BEGIN
		PRINT 'CANNOT INSERT UNDISTINCT NAME'
		ROLLBACK
	END

CREATE TRIGGER TR_SS
ON C
AFTER INSERT, UPDATE
AS
	IF EXISTS (SELECT COUNT(*)
	           FROM C
	           WHERE CDEPT = （SELECT CDEPT
	           FROM INSERTED) > 20)
		BEGIN
		printf 'INSERT NOT AVAILABLE'
		ROLLBACK
		END

