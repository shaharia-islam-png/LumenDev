echo "BUILD START"
python3.9 -m pip install --break-system-packages -r requirements.txt
python3.9 LumenDev/manage.py collectstatic --noinput --clear
echo "BUILD END"