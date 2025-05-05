import { Injectable } from '@nestjs/common';
import { CreateSequenceDto } from "./dto/create-sequence.dto";
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { Sequence } from './entities/sequence.entity';
import { FileService } from 'src/file.service';


@Injectable()
export class sequencesService {
  constructor(private fileService: FileService<Sequence[]>) {}

  findAll(name?: string): Sequence[] {
    const sequences = this.fileService.read();

    return name
      ? sequences.filter((sequence) =>
          sequence.name.toLowerCase().includes(name.toLowerCase()),
        )
      : sequences;
  }

  create(createsequenceDto: CreateSequenceDto) {
    const sequences = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const sequence = { ...createsequenceDto, id: "A" + (sequences.length + 1).toString() };

    this.fileService.add(sequence);
  }

  findOne(id: string): Sequence | null {
    const sequences = this.fileService.read();

    return sequences.find((sequence) => sequence.id === id) ?? null;
  }

  update(id: string, updatesequenceDto: UpdateSequenceDto): void {
    const sequences = this.fileService.read();

    const updatedsequences = sequences.map((sequence) =>
      sequence.id === id ? { ...sequence, ...updatesequenceDto } : sequence,
    );

    this.fileService.write(updatedsequences);
  }

  remove(id: string): void {
    const filteredsequences = this.fileService
      .read()
      .filter((sequence) => sequence.id !== id);

    this.fileService.write(filteredsequences);
  }
}