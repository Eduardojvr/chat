#include <stdio.h>
#include <stdlib.h>
#include <time.h>

__declspec(dllexport) char* getCurrentDateTime() {
    // Obtém o tempo atual
    time_t currentTime;
    time(&currentTime);

    // Converte o tempo para uma estrutura tm
    struct tm *localTime = localtime(&currentTime);

    // Aloca espaço para armazenar a data e hora formatadas
    char *dateTimeString = (char*)malloc(20);

    // Formata a data e hora e armazena na string
    strftime(dateTimeString, 20, "%Y-%m-%d %H:%M:%S", localTime);

    return dateTimeString;
}