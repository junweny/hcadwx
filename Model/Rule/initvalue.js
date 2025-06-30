




















function getDate() {
    var myDate = new Date();
    // myDate.getYear();    //��ȡ��ǰ���(2λ)
    //  myDate.getFullYear();   //��ȡ���������(4λ,1970-????)
    //  myDate.getMonth();  //��ȡ��ǰ�·�(0-11,0����1��)
    //   myDate.getDate();  //��ȡ��ǰ��(1-31)
    //    myDate.getDay();   //��ȡ��ǰ����X(0-6,0����������)
    //  myDate.getTime();  //��ȡ��ǰʱ��(��1970.1.1��ʼ�ĺ�����)
    //   myDate.getHours();   //��ȡ��ǰСʱ��(0-23)
    //   myDate.getMinutes();   //��ȡ��ǰ������(0-59)
    //   myDate.getSeconds();    //��ȡ��ǰ����(0-59)
    //   myDate.getMilliseconds();  //��ȡ��ǰ������(0-999)
    //   myDate.toLocaleDateString();    //��ȡ��ǰ����
    //    var mytime=myDate.toLocaleTimeString();    //��ȡ��ǰʱ��

    return myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
}


