package com.breno_barbosa1.sistema_vendas.service;

import com.breno_barbosa1.sistema_vendas.dto.EmployeeDTO;
import com.breno_barbosa1.sistema_vendas.dto.EmployeeUpdateDTO;
import com.breno_barbosa1.sistema_vendas.entity.Employee;
import com.breno_barbosa1.sistema_vendas.exception.EmployeeAlreadyExistsException;
import com.breno_barbosa1.sistema_vendas.exception.EmployeeNotFoundException;
import com.breno_barbosa1.sistema_vendas.exception.RequiredObjectIsNullException;
import com.breno_barbosa1.sistema_vendas.mapper.EmployeeMapper;
import com.breno_barbosa1.sistema_vendas.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public List<EmployeeDTO> findAll() {
        List<Employee> employeeList = employeeRepository.findAll();
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();

        if(!employeeList.isEmpty()) {
            for (Employee employee : employeeList) {
                var dto = employeeMapper.employeeToEmployeeDTO(employee);
                dto.setRole(employee.getRole());
                employeeDTOList.add(dto);
            }
        }
        return employeeDTOList;
    }

    public EmployeeDTO findById(Long id) {
        var entity = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException("No employee found for ID: " + id));

        return employeeMapper.employeeToEmployeeDTO(entity);
    }

    public EmployeeDTO findByCpf(String cpf) {
        var entity = employeeRepository.findByCpf(cpf)
            .orElseThrow(() -> new EmployeeNotFoundException("No employee found with the following cpf: " + cpf));

        return employeeMapper.employeeToEmployeeDTO(entity);
    }

    public EmployeeDTO findByEmail(String email) {
        var entity = employeeRepository.findByEmail(email)
            .orElseThrow(() -> new EmployeeNotFoundException("No employee found with the following email: " + email));

        return employeeMapper.employeeToEmployeeDTO(entity);
    }

    public EmployeeDTO create(EmployeeDTO employeeDTO) {
        if (employeeDTO == null) throw new RequiredObjectIsNullException();

        if (employeeRepository.findByCpf(employeeDTO.getCpf()).isPresent())
            throw new EmployeeAlreadyExistsException("Employee already exists for cpf: " + employeeDTO.getCpf());

        if (employeeRepository.findByEmail(employeeDTO.getEmail()).isPresent())
            throw new EmployeeAlreadyExistsException("Employee already exists for email: " + employeeDTO.getEmail());

        var entity = employeeMapper.employeeDTOToEmployee(employeeDTO);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setRole(employeeDTO.getRole());

        return employeeMapper.employeeToEmployeeDTO(employeeRepository.save(entity));
    }

    public EmployeeDTO update(EmployeeUpdateDTO employeeDTO) {
        if (employeeDTO == null) throw new RequiredObjectIsNullException();

        var entity = employeeRepository.findById(employeeDTO.getId())
            .orElseThrow(() -> new EmployeeNotFoundException("No employee found for ID: " + employeeDTO.getId()));

        entity.setFirstName(employeeDTO.getFirstName());
        entity.setLastName(employeeDTO.getLastName());
        entity.setEmail(employeeDTO.getEmail());
        entity.setAddress(employeeDTO.getAddress());

        return employeeMapper.employeeToEmployeeDTO(employeeRepository.save(entity));
    }

    public void delete(Long id) {
        var entity = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException("No employee found for ID: " + id));

        employeeRepository.delete(entity);
    }
}