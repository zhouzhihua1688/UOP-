@echo off

echo %0
echo %1

set folder=%1

set msg=not sit, exit
if %folder% NEQ sit (echo %msg% & goto :EOF)

set svnbase="D:\at_work\EC\apps\WebFrontend\branch\demo_uop"
set gitbase="D:\at_work\git_projects\uop\uop"

::xcopy %svnbase%\%folder% %gitbase%\%folder% /E /F /Y

xcopy %svnbase%\local_data %gitbase%\local_data /E /F /Y
xcopy %svnbase%\public %gitbase%\public /E /F /Y
xcopy %svnbase%\routes %gitbase%\routes /E /F /Y
xcopy %svnbase%\views %gitbase%\views /E /F /Y

xcopy %svnbase%\app.js %gitbase%\app.js /F /Y /G
xcopy %svnbase%\env_config.js %gitbase%\env_config.js  /F /Y /G
xcopy %svnbase%\package.json %gitbase%\package.json  /F /Y /G

rem pause