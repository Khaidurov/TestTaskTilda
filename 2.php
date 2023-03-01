<?php
// Задача 2: массивы

declare(strict_types=1);

const ROW_COUNT = 5;
const COL_COUNT = 7;
const AR_MIN_VALUE = 1;
const AR_MAX_VALUE = 1000;

$arNumbers = [];
$rowSum = 0;
$arColSum = array_fill(0, COL_COUNT, 0);

$arUniqueNumbers = getUniqueNumbersArray(ROW_COUNT * COL_COUNT, AR_MIN_VALUE, AR_MAX_VALUE);
$uniqueIndex = 0;

for ($i = 0; $i < ROW_COUNT; $i++) {
    for ($j = 0; $j < COL_COUNT; $j++) {
        $arNumbers[$i][$j] = $arUniqueNumbers[$uniqueIndex];
        $uniqueIndex++;

        $rowSum += $arNumbers[$i][$j];
        $arColSum[$j] += $arNumbers[$i][$j];

        echo ' ' . str_pad(strval($arNumbers[$i][$j]), 4, ' ', STR_PAD_LEFT);
    }
    echo ' | ' . $rowSum . PHP_EOL;
    $rowSum = 0;
}

for ($i = 0; $i < COL_COUNT; $i++) {
    echo ' ' . '____';
}
echo PHP_EOL;

for ($i = 0; $i < COL_COUNT; $i++) {
    echo ' ' . str_pad(strval($arColSum[$i]), 4, ' ', STR_PAD_LEFT);
}
echo PHP_EOL;

function getUniqueNumbersArray(int $count, int $min, int $max): array
{
    $arResult = [];

    while (count($arResult) < $count) {
        $randNumber = mt_rand($min, $max);
        $arResult[$randNumber] = 1;
    }

    $arResult = array_keys($arResult);

    return $arResult;
}